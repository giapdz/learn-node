import { UsersService } from './users.service';
import {
  Controller,
  Get,
  Post,
  HttpCode,
  Header,
  Res,
  Req,
  Redirect,
  Query,
  Param,
  HostParam,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  //   @Get()
  //   getInfo(@HostParam('account') account: string) {
  //     return account;
  //   }

  // @Post()
  // @Header('Cache-Control', 'none')
  // async create(@Body() creatUser: CreateUserDto) {
  //   // return 'This action adds a new user';
  //   return creatUser;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} cat`;
  // }

  // @Get('docs')
  // @Redirect('https://docs.nestjs.com', 302)
  // getDocs(@Query('version') version) {
  //   console.log(version);
  //   if (version && version === '5') {
  //     return { url: 'https://docs.nestjs.com/v5/' };
  //   }
  // }

  // @Get(':id')
  // findOne(@Param() params): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} cat`;
  // }

  // @Get()
  // async findAll(@Res() res: Response, @Req() req: Request) {
  //   res.status(200).send(req.body);

  //   // return 'This action returns all cats';
  // }
}
