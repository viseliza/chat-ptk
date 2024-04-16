import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Friend, Prisma } from '@prisma/client';

@Injectable()
export class FriendService {
    constructor(private prisma: PrismaService) { }

    async getAllByMe(user_id: number) {
        return await this.prisma.friend.findMany({
            where: {
                me_id: user_id,
                status: 'subscribeTo'
            }
        })
    }
    async getAllForMe(user_id: number) {
        return await this.prisma.friend.findMany({
            where: {
                friend_id: user_id,
                status: 'subscribeTo'
            }
        })
    }

    async getAllFriends(myUserId: number) {
        let existBy = await this.prisma.friend.findMany({
            where: {
                me_id: myUserId,
                status: 'friends'
            }
        });
        let existTo = await this.prisma.friend.findMany({
            where: {
                friend_id: myUserId,
                status: 'friends'
            }
        })

        const result = [...existBy, ...existTo];
        return result;
    }

    async get(myUserId: number, someUserId: number) {
        let exist = await this.prisma.friend.findFirst({
            where: {
                me_id: myUserId,
                friend_id: someUserId
            }
        });

        if (!exist) {
            exist = await this.prisma.friend.findFirst({
                where: {
                    me_id: myUserId,
                    friend_id: someUserId
                }
            });
        }

        return exist;
    }

    async subscribe(myUserId: number, someUserId: number) {
        let exist = await this.prisma.friend.findFirst({
            where: {
                me_id: myUserId,
                friend_id: someUserId
            }
        });
        if (!exist) {
            exist = await this.prisma.friend.findFirst({
                where: {
                    me_id: someUserId,
                    friend_id: myUserId
                }
            })
            if (exist) {
                let temp = myUserId;
                myUserId = someUserId;
                someUserId = temp;
            }
        }

        if (!exist) {
            return await this.prisma.friend.create({
                data: {
                    me_id: myUserId,
                    friend_id: someUserId,
                    status: "subscribeTo",
                    relation: `${myUserId}_${someUserId}`
                }
            })
        } else {
            return await this.prisma.friend.update({
                where: {
                    relation: `${myUserId}_${someUserId}`
                        
                }, data: {
                    status: "friends"
                }
            })
        }
    }   

    async unsubscribe(myUserId: number, someUserId: number) {
        let exist = await this.prisma.friend.findFirst({
            where: {
                me_id: myUserId,
                friend_id: someUserId
            }
        }); 

        if (!exist) {
           let temp = myUserId;
           myUserId = someUserId;
           someUserId = temp;
        }

        return await this.prisma.friend.delete({
            where: {
                relation: `${myUserId}_${someUserId}`
            }
        })
    }
}