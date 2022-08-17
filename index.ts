import { getPlayersInScene } from "@decentraland/Players"
import { getUserData } from "@decentraland/Identity"
import { getDecentralandTime } from "@decentraland/EnvironmentAPI"
let mySceneCode: string = ""
let requestUrl = "https://analytics.metaverse360agency.com/General/"

export class MDAnalytics {
    sceneCode: string = ""
    constructor(public code: string) {
        this.sceneCode = code
        mySceneCode=this.sceneCode
    }
    async addClickEvent(btnName) {
        let data = await getUserData()
        addUserAction(this.sceneCode, data.userId, ActionType.ButtonClick, btnName)

    }
};
executeTask(async () => {
    let players = await getPlayersInScene();
    players.forEach((player) => {
        addUserAction(this.mySceneCode, player.userId, ActionType.Near, '')

    })
});

executeTask(async () => {
    let data = await getUserData()

    addUserAction(mySceneCode, data.userId, ActionType.Connected, '');
    saveUserInfo(data.userId, data.displayName, data.publicKey, data.version)
});

onEnterSceneObservable.add((player) => {
    addUserAction(mySceneCode, player.userId, ActionType.Enter, '')
});


onLeaveSceneObservable.add((player) => {
    addUserAction(mySceneCode, player.userId, ActionType.Leave, '')
});

async function saveUserInfo(userId, displayName, publicKey, version) {
    const callUrl = requestUrl + "AddUser?userId=" + userId + "&displayName=" + displayName + "&publicKey=" + publicKey + "&version=" + version
    try {

        let response = await fetch(callUrl)
        let json = await response.json()

    } catch {
    }
};

async function addUserAction(sceneCode, userId, actionType, actionValue) {

    let time = await getDecentralandTime()
    let callUrl = requestUrl + "AddAction?code=" + sceneCode + "&userId=" + userId + "&actionId=" + actionType + "&date=" + time.seconds + "&actionValue=" + actionValue
    try {
        let response = await fetch(callUrl)
        let json = await response.json()

    } catch {
    }
};


enum ActionType {
    Test,
    Connected,
    Near,
    Enter,
    Leave,
    ButtonClick,
    VideoView,
    PhotoView,
    Buy,
    Jump
}