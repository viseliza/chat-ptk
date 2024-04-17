import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Schedule, Prisma } from '@prisma/client';

@Injectable()
export class ScheduleService {
    constructor(private prisma: PrismaService) { }

    async get(data) {
        let exist = await this.prisma.schedule.findFirst({
            where: {
                group: {
                    name: data
                }
            }
        })
        if (exist) {
            return {
                group_id: exist.group_id,
                scheduleList: [
                    [...exist.monday],
                    [...exist.tuesday],
                    [...exist.wednesday],
                    [...exist.thursday],
                    [...exist.friday],
                    [...exist.saturday],
                ]
            }
        }
    }

    async createOrUpdate(data) {
        let exist = await this.prisma.schedule.findFirst({
            where: {
                group: {
                    name: data.group_name
                }
            }
        });
        if (!exist) {
            exist = await this.prisma.schedule.create({
                data: {
                    group: {
                        connect: {
                            name: data.group_name
                        }
                    },
                    monday: data.scheduleList[0],
                    tuesday: data.scheduleList[1],
                    wednesday: data.scheduleList[2],
                    thursday: data.scheduleList[3],
                    friday: data.scheduleList[4],
                    saturday: data.scheduleList[5]
                }
            });
        }
        else  {
            await this.prisma.schedule.update({
                where: {
                    group_id: exist.group_id
                },
                data: {
                    monday: [...exist.monday, ...data.scheduleList[0]],
                    tuesday: [...exist.thursday, ...data.scheduleList[1]],
                    wednesday: [...exist.wednesday, ...data.scheduleList[2]],
                    thursday: [...exist.thursday, ...data.scheduleList[3]],
                    friday: [...exist.friday, ...data.scheduleList[4]],
                    saturday: [...exist.saturday, ...data.scheduleList[5]]
                }
            })
        }
    }
}