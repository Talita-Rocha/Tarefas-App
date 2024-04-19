import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TarefasService } from '../../../services/tarefas.services';
import { ConsultarTarefasResponse } from '../../../models/tarefas/consultar-tarefas.response';
import { NgxPaginationModule } from 'ngx-pagination';
import { MessagesComponent } from '../../layout/messages/messages.component';
import { RouterModule } from '@angular/router';
import { NgArrayPipesModule } from 'ngx-pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultar-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    NgxPaginationModule,
    MessagesComponent,
    RouterModule,
    NgArrayPipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consultar-tarefas.component.html',
  styleUrl: './consultar-tarefas.component.css'
})

export class ConsultarTarefasComponent implements OnInit {
  //atributos
  tarefas: ConsultarTarefasResponse[] = [];
  paginador: number = 1;
  mensagem: string = '';
  filtro: string = '';

  //construtor
  constructor(
    private tarefasService: TarefasService
  ) {
  }

  ngOnInit(): void {
    //consultando as tarefas
    this.tarefasService.consultar()
      .subscribe({
        next: (data) => {
          this.tarefas = data;
        },
        error: (e) => {
          console.log(e);
        }
      })
  }

  onDelete(id: string): void {
    if (confirm('Deseja realmente excluir a tarefa selecionada?')) {
      this.tarefasService.excluir(id)
        .subscribe({
          next: (data) => {
            this.mensagem = `A tarefa "${data.nome}" foi excluída com sucesso.`;
            this.ngOnInit();
          },
          error: (e) => {
            console.log(e.error);
          }
        })
    }
  }

  //função para executar o paginador
  handlePageChange(event: any): void {
    this.paginador = event;
  }

}


