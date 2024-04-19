import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CriarUsuarioRequest } from '../../../models/usuarios/criar-usuario.request';
import { UsuariosService } from '../../../services/usuarios.services';
import { PasswordMatchValidator } from '../../../validators/password-match.validator';

@Component({
  selector: 'app-criar-usuario',
  standalone: true, //trabalha de forma isolada
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})

//classe pública
export class CriarUsuarioComponent {

  //atributos (variáveis)
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  // Método constructor para inicialização de classes ou bibliotecas
  constructor(
    private usuariosService: UsuariosService,
    
  ) { }

  //Variável utilizada para capturarmos cada campo do formulário
  // estrutura do formulário
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    senhaConfirmacao: new FormControl('', [Validators.required])
  }
  ,
  {
    /* adicionando a classe de validação customizada */
    validators: [PasswordMatchValidator.matchPassword]
  }
  );

  // função para verificar o estado dos campos
  //Função auxiliar utilizada para que possamos verificar se cada campo 
  //do formulário está com erro de preenchimento (validação)
  get f() {
    return this.form.controls;
  }

  // função para capturar o evento SUBMIT do botão do formulário
  onSubmit(): void {
    
    //o método void não retorna valor
    // console.log(this.form.value)

    //limpar as mensagens exibidas na página
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    //criando um objeto de modelo de dados
    //para enviar o objeto request para a API com os campos
    const request: CriarUsuarioRequest = {
      nome: this.form.value.nome as string,
      email: this.form.value.email as string,
      senha: this.form.value.senha as string
    }

    //executando a criação do usuário
    this.usuariosService.criar(request)
    .subscribe({ //capturando a resposta da API
      next: (data) => { //recebendo messagem de sucesso

        // console.log(data)

        //capturando a mensagem de sucesso retornada pela API
        this.mensagemSucesso = `Parabéns, ${data.nome}. Sua conta foi criada com sucesso.`;
        
        //limpar os campos do formulário
        this.form.reset();
      },
      
      error: (e) => {//recebendo mensagem de erro
        this.mensagemErro = e.error.message;
      }
    });

  }

}
