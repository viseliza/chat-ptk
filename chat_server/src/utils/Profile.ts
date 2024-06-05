import { NewProfileDTO } from "src/dto/create.profile.dto";

export class Profile {
    profile: NewProfileDTO;

    constructor(profile: NewProfileDTO) { 
        this.profile = profile
    }
}