import IRoomModeratorRepository from '../../../core/repositories/IRoomModeratorRepository';
import RoomModeratorEntity from '../../../core/types/RoomModeratorEntity';
import { instancesToJson, instanceToJson } from '../helpers';
import models from '../models';

export default class RoomModerator implements IRoomModeratorRepository {
  async getRoomModeratorsByUserId(registeredUserId: string): Promise<RoomModeratorEntity[]> {
    const data = await models.RoomModerator.model.findAll({
      where: { registeredUserId },
      include: [
        {
          model: models.Room.model,
          as: 'room'
        }
      ],
      order: [[ 'createdAt', 'DESC' ]]
    });
    return instancesToJson<RoomModeratorEntity>(data);
        
  }
  async getRoomModerator(registeredUserId: string, roomId: string): Promise<RoomModeratorEntity | null> {
    const data = await models.RoomModerator.model.findOne({
      where: {
        registeredUserId,
        roomId
      },
      include: [
        {
          model: models.Room.model,
          as: 'room'
        }
      ]
    });
    return instanceToJson<RoomModeratorEntity>(data);
  }
}
