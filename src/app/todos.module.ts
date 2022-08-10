import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HeaderComponent } from "src/app/components/header/header.component";
import { TodosComponent } from "src/app/components/todos/todos.component";
import { MainComponent } from "src/app/components/main/main.component";
import { TodoComponent } from "src/app/components/todo/todo.component";
import { TodosService } from "src/app/services/todos.service";
import { FooterComponent } from "src/app/components/footer/footer.component";


const routes: Routes = [
    {
        path: '',
        component: TodosComponent    
    }
  ]

@NgModule({
    declarations: [TodosComponent, HeaderComponent,MainComponent, TodoComponent, FooterComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    providers:[TodosService]
})

export class TodosModule {}