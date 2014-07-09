<?php

class DiffManager
{
	private static $instance;

	public static function get()
	{
		if (!static::$instance)
		{
			static::$instance = new static();
		}
		return static::$instance;
	}

	public function __construct()
	{

	}

	public function getRawPath()
	{
		$path = base_path().'/data/raw';
		if (!is_dir($path))
			mkdir($path, 0777, true);
		return $path;
	}

	public function getUnzippedPath()
	{
		$path = base_path().'/data/unzipped';
		if (!is_dir($path))
			mkdir($path, 0777, true);
		return $path;
	}

	public function getPreparedPath()
	{
		$path = base_path().'/data/prepared';
		if (!is_dir($path))
			mkdir($path, 0777, true);
		return $path;
	}

	public function update()
	{
		$files = [];
		foreach (scandir($this->getRawPath()) as $entry)
		{
			if (preg_match('/^\d+\.zip$/', $entry))
			{
				$files[] = $this->getRawPath().'/'.$entry;
			}
		}
		$latest = count($files) > 0 ? max($files) : null;

		$t = time();

		// Don't try to update too often
		if (!$latest || ((int)basename($latest, '.zip') - $t) > 24*60*60)
		{
			$data = file_get_contents(Config::get('crowdinspect.download_url'));
			if (!$latest || md5(file_get_contents($latest)) !== md5($data))
			{
				$new_file = $this->getRawPath()."/$t.zip";
				file_put_contents($new_file, $data);
			}
		}

		$this->prepareNewFiles();
	}

	public function prepareNewFiles()
	{
		foreach (scandir($this->getRawPath()) as $archive)
		{
			if (preg_match('/^\d+\.zip$/', $archive))
			{
				$unzipped_dir = $this->getUnzippedPath().'/'.basename($archive, '.zip');
				if (!is_dir($unzipped_dir))
				{
					mkdir($unzipped_dir);
					$zip = new ZipArchive();
					$zip->open($this->getRawPath().'/'.$archive);
					$zip->extractTo($unzipped_dir);
					$this->prepareDirectory($unzipped_dir);
				}
			}
		}
	}

	public function prepareDirectory($dir)
	{
		$versions = array();
		$timestamp = basename($dir);

		foreach (scandir($dir) as $entry)
		{
			$path = $dir.'/'.$entry;
			if (is_dir($path) && preg_match('/^\d+(?:\.\d+)*$/', $entry))
			{
				$version = $entry;
				$translations = $this->extractTranslations($path);
				$versions[$version] = $translations;
			}
		}

		$this->writeExtractedTranslations($timestamp, $versions);
	}

	public function writeExtractedTranslations($timestamp, $versions)
	{
		$base = $this->getPreparedPath().'/'.$timestamp;
		if (!is_dir($base))
			mkdir($base);

		foreach ($versions as $version => $data)
		{
			$dir = $base.'/'.$version;
			if (!is_dir($dir))
				mkdir($dir);
			foreach ($data as $lc => $files)
			{
				file_put_contents($dir."/$lc.json", json_encode($files, JSON_PRETTY_PRINT));
			}
		}

	}

	public function extractTranslations($dir)
	{
		$all_translations = array();
		$dir = realpath($dir);

		foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir)) as $path => $info)
		{
			$rel_path = substr($path, strlen($dir) + 1);
			if (preg_match('/\.php$/', $rel_path))
			{
				$meta = $this->getTranslationFileMetaInfo($rel_path);
				if (!$meta)
				{
					throw new \Exception("Unrecognized file: $rel_path.");
				}
				else
				{
					$translations = $this->extractTranslationsFromFile($path, $meta);
					if (!$translations)
					{
						throw new \Exception("Don't know how to get the translations from: $rel_path");
					}
					else
					{
						$lc = $meta['language_code'];
						if (!isset($all_translations[$lc]))
						{
							$all_translations[$lc] = array();
						}

						$p = $meta['language_independent_path'];
						$all_translations[$lc][$p] = $translations;
					}
				}
			}
		}

		return $all_translations;
	}

	public function getTranslationFileMetaInfo($rel_path)
	{
		$meta = array(
			'language_independent_path' => null,
			'type' => null,
			'language_code' => null
		);

		$lce = '([a-z]{2,3}-[A-Z]{2})';

		$m = array();

		if (preg_match('#^mails/'.$lce.'/lang\.php$#', $rel_path, $m))
		{
			$meta['language_independent_path'] = 'mails/[lc]/lang.php';
			$meta['type'] = 'email_subjects';
			$meta['language_code'] = $m[1];
			return $meta;
		}
		else if (preg_match('#^translations/'.$lce.'/(tabs|pdf|admin|fields|errors)\.php$#', $rel_path, $m))
		{
			$meta['language_independent_path'] = 'translations/[lc]/'.$m[2].'.php';
			$meta['type'] = $m[2];
			$meta['language_code'] = $m[1];
			return $meta;
		}
		else if (preg_match('#^install-dev/langs/'.$lce.'/install\.php$#', $rel_path, $m))
		{
			$meta['language_independent_path'] = 'install-dev/langs/[lc]/install.php';
			$meta['type'] = 'install';
			$meta['language_code'] = $m[1];
			return $meta;
		}
		else if (preg_match('#^modules/([^/]+)/translations/'.$lce.'\.php$#', $rel_path, $m))
		{
			$meta['language_independent_path'] = 'modules/'.$m[1].'/translations/[lc].php';
			$meta['type'] = 'modules';
			$meta['language_code'] = $m[2];
			return $meta;
		}
		else if (preg_match('#^modules/emailgenerator/templates_translations/'.$lce.'/lang_content\.php$#', $rel_path, $m))
		{
			$meta['language_independent_path'] = 'modules/emailgenerator/templates_translations/[lc]/lang_content.php';
			$meta['type'] = 'email_contents';
			$meta['language_code'] = $m[1];
			return $meta;
		}
		else if (preg_match('#^themes/default-bootstrap/lang/'.$lce.'\.php$#', $rel_path, $m))
		{
			$meta['language_independent_path'] = 'themes/default-bootstrap/lang/[lc].php';
			$meta['type'] = 'theme';
			$meta['language_code'] = $m[1];
			return $meta;
		}

		return null;
	}

	public function extractTranslationsFromFile($path, $meta)
	{
		$dictionary = require($path);
		if (!is_array($dictionary))
		{
			throw new \Exception("File does not seem to contain an array: $path.");
		}

		return $this->flattenArray($dictionary);
	}

	public function flattenArray(array $arr)
	{
		$out = array();

		foreach ($arr as $key => $value)
		{
			if (is_array($value))
			{
				$tmp = $this->flattenArray($value);
				foreach ($tmp as $k => $v)
				{
					$out[$key.'/'.$k] = $v;
				}
			}
			else
			{
				$out[$key] = $value;
			}
		}

		return $out;
	}
}
