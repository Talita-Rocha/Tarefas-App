import { HttpClient } from "@angular/common/http";
import { AutenticarUsuarioRequest } from "../models/usuarios/autenticar-usuario.request";
import { CriarUsuarioRequest } from "../models/usuarios/criar-usuario.request";
import { Observable } from "rxjs";
import { CriarUsuarioResponse } from "../models/usuarios/criar-usuario.response";
import { AutenticarUsuarioResponse } from "../models/usuarios/autenticar-usuario.response";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

//Para fornecer a injeção de dependência da classe UsuariosService
@Injectable({
    providedIn: 'root'
})

// Classe de serviço para realizar a integração com o ENDPOINT '/usuarios/' da API
export class UsuariosService {

    //variável do componente
    apiUrl: string = environment.usuariosApi;

    //Método construtor para declarar e inicializar a biblioteca HttpClient
    //Para consumir a injeção de dependência da classe HttpClient
    constructor(
        private httpClient: HttpClient
    ) {
    }

    //Função para acessar o serviço de criação de usuário (/api/usuarios/criar)
    criar(request: CriarUsuarioRequest): Observable<CriarUsuarioResponse> {
        return this.httpClient.post<CriarUsuarioResponse>
            (environment.usuariosApi + '/criar', request);
    }

    //Função para acessar o serviço de autenticação de usuário (/api/usuarios/autenticar)
    autenticar(request: AutenticarUsuarioRequest): Observable<AutenticarUsuarioResponse> {
        return this.httpClient.post<AutenticarUsuarioResponse>
            (environment.usuariosApi + "/autenticar", request);
    }
}
