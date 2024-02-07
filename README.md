# LRDM - Static


## Initialize project 

__Install NPM__
```bash
npm install
```

__Install TWIG__
```bash
php composer.phar install
```

__Copy env file__
```bash
cp .env.prod .env
```

## Build static project 
_This command build npm and html and copy the files into static dir_
```bash
php bin/build
```
