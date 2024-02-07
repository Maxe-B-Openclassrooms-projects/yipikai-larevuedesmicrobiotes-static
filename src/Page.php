<?php

namespace App;
use App\Route\Route;
use App\Assets\Assets;

use Symfony\Component\HttpFoundation\Request;

use Twig\Environment;
use Twig\Extension\CoreExtension;
use Twig\Extension\DebugExtension;
use Twig\Loader\FilesystemLoader;

/**
 * Routes Loader.
 * @author Matthieu Beurel <matthieu@yipikai.studio>
 */
class Page {

  /**
   * @var Route
   */
  private Route $route;

  /**
   * @var Request
   */
  private Request $request;

  /**
   * @var array
   */
  private array $config;

  /**
   * @var bool
   */
  private bool $debug;

  /**
   * @var string|bool
   */
  private string $env;

  /**
   * @param Request $request
   * @param array $config
   *
   * @return Page
   */
  public static function createPage(Request $request, array $config): Page
  {
    return (new self($request, $config));
  }

  /**
   * @param Request $request
   * @param array $config
   */
  public function __construct(Request $request, array $config)
  {
    $this->route = new Route();
    $this->request = $request;
    $this->config = $config;
    $this->debug = (bool) $this->getConfigBygKey("APP_DEBUG", 0);
    $this->env = $this->getConfigBygKey("APP_ENV", "prod");
  }

  /**
   * @return void
   */
  public function execute()
  {
    try {
      $page = $this->route->retreivePage($this->request->getPathInfo());
      $loader = new FilesystemLoader(__DIR__ . '/../templates');
      $twig = new Environment($loader,[
        'debug' => $this->debug,
      ]);
      $twig->getExtension(CoreExtension::class)->setTimezone('Europe/Paris');
      if($this->debug)
      {
        $twig->addExtension(new DebugExtension());
      }
      $page["vars"] = $this->createVarsByRoute($page["vars"]["code"], $page["vars"]);
      echo $twig->render($page["template"], array(
          "webpack" =>  array(
            "css" => Assets::load("build/app.css"),
            "js" => Assets::load("build/app.js"),
            "runtime" => Assets::load("build/runtime.js")
          ),
          "routes"  =>  $this->route->getRoutes(),
          "vars"    =>  $page["vars"]
        )
      );
    } catch(\Exception $e) {
      if($this->env === "dev" && $this->debug)
      {
        dump($e);
      }
    }
  }

  /**
   * @param string $configName
   * @param $default
   *
   * @return string|null
   */
  protected function getConfigBygKey(string $configName, $default = null): ?string
  {
    return array_key_exists($configName, $this->config) ? $this->config[$configName] : $default;
  }

  /**
   * @param string $code
   * @param array $pageVars
   *
   * @return array
   */
  protected function createVarsByRoute(string $code, array $pageVars = array()): array
  {
    $pageVars["projectName"] = "LRDM";
    return $pageVars;
  }



}