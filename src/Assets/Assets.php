<?php

namespace App\Assets;

/**
 * Assets Loader.
 * @author Matthieu Beurel <matthieu@yipikai.studio>
 */
final class Assets {

  public static function load($name)
  {
    $manifestPath = sprintf("%s/../../public/build/manifest.json", __DIR__);
    if(file_exists($manifestPath))
    {
      $fileContent = file_get_contents($manifestPath);
      $datas = json_decode($fileContent, true);
      if(array_key_exists($name, $datas))
      {
        return $datas[$name];
      }
    }
    return "errors";
  }
}