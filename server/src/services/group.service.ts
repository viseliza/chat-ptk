import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Group, Prisma } from '@prisma/client';

@Injectable()
export class GroupService {
    constructor(private prisma: PrismaService) { }

    getByUserId(user_id: number): Promise<Group> {
        return this.prisma.group.findFirst({
            where: {
                profiles: {
                    some: {
                        user_id
                    }
                }
            }
        });
    }

    get(where): Promise<Group> {
        return this.prisma.group.findUnique({
            where: {
                name: where.name
            }
        });
    }

    findMany() {
        return this.prisma.group.findMany({
            select: {
                name: true
            }
        });
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