import { RouterModule, Routes} from '@angular/router'
import { HomeComponent } from './Components/home/home.component';
import { ForoComponent } from './Components/foro/foro.component';

const APP_ROUTES: Routes = [

    {path: 'home', component: HomeComponent},
    {path: 'foro', component: ForoComponent},
    {path: '**', pathMatch: 'full', redirectTo:'home'}
    ];
    
    export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);