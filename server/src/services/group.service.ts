import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Group, Prisma } from '@prisma/client';

@Injectable()
export class GroupService {
    constructor(private prisma: PrismaService) { }

    get(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
        return this.prisma.group.findUnique({ where });
    }

    async findMany(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.GroupWhereUniqueInput;
        where?: Prisma.GroupWhereInput;
        orderBy?: Prisma.GroupOrderByWithRelationInput;
    }): Promise<Group[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return await this.prisma.group.findMany({ skip, take, cursor, where, orderBy });
    }

    create(data: Prisma.GroupCreateInput): Promise<Group> {
        return this.prisma.group.create({
            data
        });
    }

    createMany(data: Prisma.GroupCreateManyInput[]): Promise<Prisma.BatchPayload> {
        return this.prisma.group.createMany({
            data
        });
    }

    update(params: {
        where: Prisma.GroupWhereUniqueInput;
        data: Prisma.GroupUpdateInput;
    }): Promise<Group> {
        const { data, where } = params;
        return this.prisma.group.update({
            data,
            where,
        });
    }

    delete(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
        return this.prisma.group.delete({
            where,
        });
    }
}