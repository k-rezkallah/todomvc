import { Component } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";
import { TodosService } from "src/app/services/todos.service";
import { FilterEnum } from "src/app/types/filter.enum";
import { TodosInterface } from "src/app/types/todos.interface";

@Component({
    selector:'app-todos-main',
    templateUrl:'./main.component.html'
})

export class MainComponent{
    
    visibleTodos$ : Observable<TodosInterface[]> ;
    noTodos$ : Observable<boolean>;
    isAllTodosSeleted$ : Observable<boolean>;
    editingId : string | null = null;

    constructor(private todoservice: TodosService){

        this.isAllTodosSeleted$ = this.todoservice.todo$.pipe( 
            map( (todos) =>  todos.every( todo => todo.isCompleted) )
        )

        this.noTodos$ = this.todoservice.todo$.pipe(map( (todos) => {return todos.length === 0 }));
        
        this.visibleTodos$ = combineLatest(
            this.todoservice.todo$,
            this.todoservice.filter$
        ).pipe(map(([todos, filter] : [TodosInterface[] , FilterEnum] ) => {

            if( filter === FilterEnum.active){
                return todos.filter( (todos) => !todos.isCompleted);
            }else if( filter=== FilterEnum.completed){
                return todos.filter( (todos ) => todos.isCompleted);
            }
            return todos;
        }));
    }

    toogleAllTodos(event : Event ) :void {

        const target = event.target as HTMLInputElement;

        this.todoservice.toggleAll( target.checked );

    }


    setEditingId(todoId : string | null) : void {
        this.editingId = todoId; 
    }
}