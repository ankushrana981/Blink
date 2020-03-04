# Blink Admin Panel

## Prequisites (Development & Deployment):

| Module | Version |
| --- | --- |
| Node | 8.9.4 |
| npm | 6.4.1 |
| pm2 | 0.9.6 |
| angular-cli | 7.0.3 |
| angular | 7.0.0 |

## DEVELOPEMENT 


## Folder Structure :

```bash
|-- lazyloadingseedwithseo
	|-- master
	|   |-- lazyloadingseedwithseo
```

## One time project setup  

###### Make a directory of respective project name:

> mkdir [Project Name]

###### Make clone of Node and Angular in directories:

> git clone http://git.indianic.com/blink-angular7/ng-admin blink-admin


###### Install the packages in directories:

> cd blink-admin/

> npm install

###### Change project port and api call:

> cd src/assets/config/

> cp configs-sample.ts configs.ts
  
> nano configs.ts

 Change apiUrl and port as per the your project and save using following commands

###### Run Project:

 Open cmd go to project directory like cd /Volumes/DATA/ABC/Project Name/angular

> ng serve

###### Make a build and run project:

  Open cmd go to project directory like cd /Volumes/DATA/ABC/Project Name/angular

> npm run build


## DEPLOYMENT 


###### Create the PM2 instance :

> pm2 start server.js --name=Project Name


## Lazy Loading Ng Modules reference

    - https://angular.io/guide/lazy-loading-ngmodules


## PLUG IN


###### Plug In already Installed:

 1) jquery
     
     Version: 3.3.1
     
     Url: https://jquery.com/download/

 2) bootstrap
 
     Version: 4.2.1
     
     Url: https://getbootstrap.com/docs/4.2/getting-started/introduction/
 
 3) ngx-bootstrap
 
     Version: 3.1.3
     
     Url: https://valor-software.com/ngx-bootstrap/#/documentation#getting-started

 4) ng-select/ng-select
 
     Version: 2.13.3
     
     Url: https://github.com/ng-select/ng-select#readme
     
 5) ngx-loading-bar/http-client
 
     Version: 3.0.0
     
     Url: https://github.com/aitboudad/ngx-loading-bar#readme
     
 6) ngx-spinner
 
     Version: 6.1.2
     
     Url: https://www.npmjs.com/package/ngx-spinner
     
 7) sweetalert2
 
     Version: 7.33.1
     
     Url: https://sweetalert2.github.io/
 
 8) font-awesome
 
     Version: 4.7.0
     
     Url: https://fontawesome.com/v4.7.0/

 9) ngx-image-cropper
 
     Version: 1.3.4
     
     Url: https://github.com/Mawi137/ngx-image-cropper
     
###### Plug In that generally use in Indianic:

 1) Charts:
    
    - Google charts:
    
       a) https://www.npmjs.com/package/google-charts
       
       b) https://developers.google.com/chart/interactive/docs/quick_start
       
    - highcharts:
    
       a) https://www.highcharts.com/
       
 2) Social Login for Facebook, Google and LinkedIn:
 
    - angularx-social-login
    
        a) https://github.com/abacritt/angularx-social-login#readme
        
 3) Social Share Button:
 
    - ngx-sharebuttons
    
        a) https://github.com/MurhafSousli/ngx-sharebuttons/wiki