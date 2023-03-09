// const { default: mongoose } = require("mongoose");
import mongoose from "mongoose";
// const todoModel = require("../models/todoModel");
import {todoModel} from "../models/todoModel.js";

/*
1. createTodo
2. getAllTodos
3. getSingleTodoById
4. getTodosByQuery
5. updateTodoById
6. DeleteTodoById
*/

export async function createTodo(todo,callback){
    try{
        var newTodo = new todoModel(todo);
        var result = await newTodo.save();
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}
export const getAllTodos = async function(callback){
    try{
        var todos = await todoModel.find({isCompleted: false,isDeleted: false});
        callback(null,todos);
    }
    catch(err){
        callback(err,null);
    }
}
export const getAllCompletedTodos = async function(callback){
    try{
        var todos = await todoModel.find({isCompleted: true,isDeleted: false});
        callback(null,todos);
    }
    catch(err){
        callback(err,null);
    }
}

export const getAllDeletedTodos = async function(callback){
    try{
        var todos = await todoModel.find({isDeleted: true});
        callback(null,todos);
    }
    catch(err){
        callback(err,null);
    }
}

export const getTodosByQuery = async function(query,callback){
    try{
        var todos = await todoModel.find(query);
        callback(null,todos);
    }
    catch(err){
        callback(err,null);
    }
}

export const getSingleTodoById = async function(id,callback){
    try{
        var todo = await todoModel.findOne(id);
        callback(null,todo);
    }
    catch(err){
        callback(err,null);
    }
}

export const updateTodoById = async function(id,data,callback){
    try{
        var todo = {
            _id: new mongoose.Types.ObjectId(id),
        };
        var result = await todoModel.updateOne(todo,data);
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}

export const deleteTodoById = async function(id,callback){
    try{
        var todo = {
            _id: id,
        };
        var result = await todoModel.updateOne(todo,{isDeleted: true});
        callback(null,result);
    }
    catch(err){
        callback(err,null);
    }
}