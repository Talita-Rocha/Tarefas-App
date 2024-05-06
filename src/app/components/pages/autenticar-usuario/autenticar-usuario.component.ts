import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.services';
import { AutenticarUsuarioRequest } from '../../../models/usuarios/autenticar-usuario.request';
import { Router } from '@angular/router';
import { AuthHelper } from '../../../helpers/auth.helper';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true, //trabalha de forma isolada
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})

//classe pública
export class AutenticarUsuarioComponent {

  //atributos (variaveis)
  mensagemErro: string = '';

  //Método constructor para inicialização de classes ou bibliotecas
  constructor(
    private usuariosService: UsuariosService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private authHelper: AuthHelper,
  ) {
  }

  //Variável utilizada para capturarmos cada campo do formulário
  // estrutura do formulário
  form = new FormGroup({
    /*campo 'e-mail'*/
    email: new FormControl('', [Validators.required, Validators.email]),
    /*campo 'senha'*/
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  // função para verificar o estado dos campos
  //Função auxiliar utilizada para que possamos verificar se cada campo 
  //do formulário está com erro de preenchimento (validação)
  get f() {
    return this.form.controls;
  }

  //Função para capturar o evento SUBMIT do formulário
  onSubmit(): void {

    //o método void não retorna valor
    // console.log(this.form.value);

    //criando um objeto de modelo de dados
    //para enviar o objeto request para a API com os campos
    const request: AutenticarUsuarioRequest = {
      email: this.form.value.email as string,
      senha: this.form.value.senha as string
    }

    //exibindo o spinner
    this.spinnerService.show();

    //executando a autenticação do usuário
    this.usuariosService.autenticar(request)
      .subscribe({//capturar o retorno da API
        next: (data) => { //recebendo mensagem de sucesso

          // console.log(data)

          //armazenar os dados do usuário autenticado em sessão
          this.authHelper.signIn(data);

          //redirecionar para a página de dashboard do sistema  
          this.router.navigate(['admin/dashboard'])
            .then(() => {
              location.reload(); //recarregar a página no navegador
            });
        },
        error: (e) => { //recebendo mensagem de erro
          this.mensagemErro = e.error.message;
        }
      })
      
      .add(() => {
        this.spinnerService.hide();
      })
  }
}
