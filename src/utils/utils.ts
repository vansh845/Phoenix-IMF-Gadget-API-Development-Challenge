import {v4 as uuidv4} from 'uuid';


export function generateUUID(){
    return uuidv4();
}

export function generatePercentage(){
    return Math.floor(Math.random()*100);
}
