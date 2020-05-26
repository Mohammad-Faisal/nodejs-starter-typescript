import { Request, Response } from "express";
import { getManager, Repository } from "typeorm";
import { UserInfo } from "../models/model";
import { Result } from "../../../models/Result";
import ValidationExceptions from "../../../constants/ValidationExceptions";
import CustomError from "../../../models/CustomError";
import { IUserRepository } from "./irepository";
import { injectable } from "inversify";
import config from "../../../config";


@injectable()
export class PGUserRepository implements IUserRepository {

    private repository = require('../../../database');


    private pool: any;

    constructor() {
        const { Pool } = require('pg');
        this.pool = new Pool({
            user: config.dbUserName,
            host: config.dbURL,
            database: config.dbName,
            password: config.dbPassword,
            port: config.dbPort,
        })
    }


    public saveUser = async (userModel) => {

        return await this.repository.query(userModel)
            .then(response => {
                return Result.succesful(response);
            })
            .catch(error => {
                return Result.failure(new CustomError(450, error.message));
            })

    }

    public getAllUsers = async () => {

        return await this.pool.query('SELECT * FROM USERINFO', [])
        .then(response  => {

            return Result.succesful(response.rows);
        })
        .catch(error => {
            return Result.failure(new CustomError(450, error.message));
        })
       
    }
}
