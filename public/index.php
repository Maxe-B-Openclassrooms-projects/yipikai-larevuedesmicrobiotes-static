<?php
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\ErrorHandler\Debug;

use App\Page;

require dirname(__DIR__).'/vendor/autoload.php';

(new Dotenv())->bootEnv(dirname(__DIR__).'/.env');
umask(0000);

if ($_SERVER['APP_DEBUG']) {
  Debug::enable();
}

if(array_key_exists("argv", $_SERVER) && count($_SERVER['argv']) > 0 && array_key_exists("SHELL",$_SERVER))
{
  $_SERVER["REQUEST_URI"] = array_key_exists(1, $_SERVER["argv"]) ? $_SERVER['argv'][1] : "";
}
$request = Request::createFromGlobals();
$page = Page::createPage($request, $_SERVER);
$page->execute();