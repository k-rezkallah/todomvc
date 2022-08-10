import { Injectable } from "@angular/core";
import { BehaviorSubject, map, retry } from "rxjs";
import { FilterEnum } from "../types/filter.enum";
import { TodosInterface } from "../types/todos.interface";

@Injectable()

export class TodosService {

    todo$ = new BehaviorSubject<TodosInterface[]>([]);
    filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

    addTodo ( value : string ) :void {

        const newTodo : TodosInterface  = {
            value,
            isCompleted: false,
            id: Math.random().toString(16)
        }

        const updateTodos  = [ ...this.todo$.getValue() , newTodo ];
        this.todo$.next(updateTodos);
    } 

    toggleAll( isCompleted :boolean ) :void  {
        
        const updateTodos = this.todo$.getValue().map( (todo) => {
            return {
                ...todo,
                 isCompleted
                };
        } )
        this.todo$.next(updateTodos);
    }
    changeFilter(filterName: FilterEnum): void {
        this.filter$.next(filterName);
    }
    
      removeTodo( id: string) : void {
        const updateTodos = this.todo$.getValue().filter(
            (todo) => todo.id !== id
        );
        this.todo$.next(updateTodos);

  
      }
      changeTodo( id: string, text: string ){
        const updateTodos = this.todo$.getValue().map(
            (todo) => {
                if (todo.id === id ){
                    return {
                        ...todo,
                        value:text
                    };
                }
                else return todo;
            }
        )
        this.todo$.next(updateTodos);
      }
      toggleTodo( id: string) : void {

        const updateTodos = this.todo$.getValue().map(
            (todo) => {
                if (todo.id === id ) return {
                    ...todo,
                    isCompleted: !todo.isCompleted 
                }
                return todo;
            }
        )
        this.todo$.next(updateTodos);
      }
}