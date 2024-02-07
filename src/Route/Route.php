<?php

namespace App\Route;

use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Routes Loader.
 * @author Matthieu Beurel <matthieu@yipikai.studio>
 */
final class Route
{

    /**
     * @var array
     */
    protected array $routes = array(
        "/" => array(
            "template" => "pages/index.html.twig",
            "vars" => array(
                "code" => "homepage",
                "meta" => array(
                    "title" => "Homepage",
                    "description" => ""
                )
            ),
        ),
        "/numbers" => array(
            "template" => "pages/numbers.html.twig",
            "vars" => array(
                "code" => "number",
                "meta" => array(
                    "title" => "Numbers",
                    "description" => ""
                )
            ),
        ),
        "/number" => array(
            "template" => "pages/number.html.twig",
            "vars" => array(
                "code" => "number",
                "meta" => array(
                    "title" => "Number",
                    "description" => ""
                )
            ),
        ),
        "/committee" => array(
            "template" => "pages/committee-scientific.html.twig",
            "vars" => array(
                "code" => "Committee",
                "meta" => array(
                    "title" => "Committee of Scientific",
                    "description" => ""
                )
            ),
        )
    );

    public function __construct()
    {

    }

    /**
     * @return array
     */
    public function getRoutes(): array
    {
        return $this->routes;
    }

    /**
     * @param string $path
     *
     * @return array
     */
    public function retreivePage(string $path): array
    {
        if (!array_key_exists($path, $this->routes)) {
            throw new HttpException(404, "Page not Found");
        }
        $this->routes[$path]["vars"]["uri"] = $path;
        return $this->routes[$path];
    }


}