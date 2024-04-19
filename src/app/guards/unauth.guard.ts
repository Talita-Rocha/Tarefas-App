import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHelper } from "../helpers/auth.helper";

@Injectable({
    providedIn: 'root'
})
export class UnAuthGuard {
    //método construtor
    constructor(
        private router: Router,
        private authHelper: AuthHelper
    ) { }

    /*O angular deverá liberar o acesso a rota caso não exista um usuário autenticado*/
    canActivate() {
        //buscando o usuário autenticado no projeto
        const usuario = this.authHelper.getUser();
        //verificando se existe um usuário
        if (usuario == null) {
            return true;
        }
        else {
            //redirecionar para a página do dashboard
            this.router.navigate(['/admin/dashboard']);
            return false;
        }
    }
}