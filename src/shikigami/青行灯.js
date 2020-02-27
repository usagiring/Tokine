import { roll } from '../utilities/tools'
import * as event from '../utilities/event'

const skillA = {
    lv5: {
        cost: 0,
        isOk(energy, cost) {
            return energy >= cost
        },
        run(info, shikigami) {

        }
    }
}

const skillB = {
    lv5: {
        cost: 0,
        isOk(energy, cost) {
            return energy >= cost
        },
        run(shikigami) {

        }
    }
}

const skillC = {
    lv5: {
        cost: 3,
        isOk(energy, cost) {
            return energy >= cost
        },
        run(info, shikigamis) {

        }
    }
}

const meta = {
    name: '青行灯',
    effects: [],
    onStart() {

    },
    onEnd() {

    },
    AI({
        selfTeam,
        enemyTeam,
        energy
    }) {
        const info = getInfo()
        const enemy = enemyTeam[0] // random
        info.skillC.isOk(energy, info.skillC.cost) ? info.skillC.run(info, enemyTeam) : info.skillA.run(info, enemy)

    }
}

let info = meta
function init(attribute, skillLevels) {
    info = Object.assign({}, meta, attribute)
    info.skillA = skillA[skillLevels[0]]
    info.skillB = skillB[skillLevels[1]]
    info.skillC = skillC[skillLevels[2]]

    event.on('烛火', ({ 青行灯 }) => {
        if (青行灯.烛火 < 3) {
            青行灯.烛火 = 青行灯.烛火 + 1
        }
    })
    event.on('明灯', ({
        shikigami,
        青行灯,
        energy
    }) => {
        if (shikigami.明灯 = true) {
            shikigami.明灯 = false
            shikigami.skillA.cost = shikigami.skillA.oldCost
            return
        }
        if (青行灯.烛火 < 3) {
            if (!roll(0.4 - energy * 0.03)) return
        } else {
            青行灯.烛火 = 0
        }
        shikigami.明灯 = true
        shikigami.skillA.oldCost = shikigami.skillA.cost
        shikigami.skillA.cost = 0

        shikigami.effects = [...shikigami.effects, {
            name: '明灯',
            type: 'damageIncrease',
            times: 1,
            ratio: energy * 0.08
        }]
    })

    event.on('明灯end', ({
        shikigami
    }) => {
        if (shikigami.明灯 = true) {
            shikigami.明灯 = false
            shikigami.skillA.cost = shikigami.skillA.oldCost
            return
        }
    })

    return info
}

function getInfo() {
    return info
}


export {
    init,
    getInfo,
    battleInit
}