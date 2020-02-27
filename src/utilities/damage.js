// [（ 基础攻击 + 面板红字攻击 + （ 攻击加成和 * 基础攻击 ））* 技能加成系数 * 暴击伤害 * 300 
//  /
// （ （ 基础防御 + 面板红字防御 + （ 防御加成和 * 基础防御 ）- 忽略防御 ） * 技能忽略防御 * 网切忽略(0.55) + 300 ）
// *
// （ 1 + 伤害加成百分比 ） * （ 1 + 承受伤害增加 ） / （ 1 + 造成伤害降低 ） * （ 1 + 免伤百分比 ）
// * 技能增减伤 * 鸣屋 * 浮动 - 护盾 ]
// * 破势&心眼

import { roll } from './tools'
import { event } from './event'

export default (
    attack,
    defend,
    damageRatio
) => {
    const attackIncreaseRatio = attack.effects.filter(e => e.name === 'attackIncrease').map(e => e.ratio).reduce((sum, next) => sum + next, 0)
    let damage = (attack.atk + attack.atkB + attackIncreaseRatio * attack.atk) * damageRatio
    if (roll(attack.cri)) {
        // emit event
        damage * attack.criD
    }
    attack.effects.filter(e => {
        return e.name === 'attackReduce'
    })
    attack.effects.filter(e => {
        return e.name === 'damageIncrease'
    })
    attack.effects.filter(e => {
        return e.name === 'damageReduce'
    })
    defend.effects.filter(e => {
        return e.name === 'defendIncrease'
    })
    defend.effects.filter(e => {
        return e.name === 'defendReduce'
    })

    attack.mitama === '兵主部'
    attack.mitama === '破势'
    attack.mitama === '鸣屋'
}