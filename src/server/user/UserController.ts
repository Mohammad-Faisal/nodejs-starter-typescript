import { Controller, UseBefore, QueryParams, JsonController, Param, Body, Get, Post, Put, Delete, Res, NotFoundError, Req, BodyParam } from "routing-controllers";
import { IUserService } from "./iservice";
import { Request, Response } from 'express';
import TYPES from "../../injector/file.types";
import DIContainer from "../../injector/inversify.config";
import { SuccessResponse } from "../../models/SuccessResponse";
import CreateUserRequest from "./models/CreateUserRequest";
import "reflect-metadata";

@JsonController()
export default class UserController {

  public userService: IUserService = DIContainer.get<IUserService>(TYPES.IUserService);


  @Get("/getUsers/")
  async getAll(@Res() response: Response) {
    const allUsers = await this.userService.getAllUsers();
    return response.json(new SuccessResponse(allUsers.getValue()));
  }

  @Post("/createUser/")
  async createUser(@Body({ required: true }) createUserRequest: CreateUserRequest, @Res() response: Response) {
    console.log(createUserRequest);
    const userInfo = await this.userService.createNewUser(createUserRequest);
    return response.json(new SuccessResponse(userInfo.getValue()));
  }

}