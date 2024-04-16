import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Replacement, Prisma } from '@prisma/client';

@Injectable()
export class ReplacementService {
    constructor(private prisma: PrismaService) { }

    async get(date: string) {
        return await this.prisma.replacement.findFirst({
            where: {
                date
            }
        })
    }

    async create(data) {
        const exist = await this.get(data.date);
        if (!exist) {
            return await this.prisma.replacement.create({
                data: {
                    date: data.date,
                    text: data.text
                }
            });
        }
        else  {
            return await this.prisma.replacement.update({
                where: {
                    date: data.date
                },
                data: {
                    text: data.text
                }
            })
        }
    }
}