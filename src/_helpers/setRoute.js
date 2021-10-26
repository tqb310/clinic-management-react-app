
/******lazyComponentPath: absolute path*********/
export function Route(path, title, exact, isPublic, lazyComponentPath){
    
        this.path = path; 
        this.title = title;
        this.exact = exact;
        this.public = isPublic;
        this.component = lazy(() => import(lazyComponentPath));
 
}
