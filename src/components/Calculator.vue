<template>
  <div id="calculator" style="font-size: 14px; ">
    
      <div class="header"><span class="label">计算公式: </span><span >技能伤害</span>*
          (1-副本减伤+玩家造伤)*
          暴击伤害*
          (1+属性造伤)*
          (1+武器增伤)*
          (1+0.02*等级差)*
          (1-防御减伤)*
          (1-副本特减)*
          (1-韧性+穿透)*
          (1+属性增伤)*
          (1+技能增伤)*
          (1+武器属性对应)*
          (1-怪物属性对应)*
              <Tooltip content="普通攻击没有浮动，最终伤害不计算浮动">
                <span class="tip">伤害浮动(0.9~1.1)</span>
            </Tooltip>
        </div>
        <div class="header">
          <span style="color:red;font-size: 16px;">最终伤害:</span>
          <span style="color:red;font-size: 16px;">{{damage}}</span>
            <span style="margin-left: 20px;">
                <Button v-on:click="setBaseDamage">设置基础值</Button>
             <span v-if="this.baseDamage">
                 <Button v-on:click="setTableData">对比</Button>
                 <span style="margin-left: 10px;" :class="this.curRate>= 0? 'up': 'down'">
                {{curRate}}%
                 </span>
             </span>
            </span>
      </div>
        <div class="container">
      <div class="item-container">
           <Tooltip content="技能面板伤害或者表伤" placement="top">
          <span class="label tip">技能伤害:</span>
           </Tooltip>
          <InputNumber v-model="skillDamage" :min="0" :step="10000"/>
      </div>
      <div class="item-container">
          <span class="label">副本减伤:</span>
          <InputNumber v-model="normalReduction" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
          <span class="label margin-left">玩家造伤:</span>
          <InputNumber v-model="normalAdd" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
      </div>
      <div class="item-container">
          <span class="label">暴击伤害:</span>
          <InputNumber :min="0" v-model="criticalDamage" :step="10" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
      </div>
      <div class="item-container">
          <Tooltip content="对XX属性造成XX%伤害" placement="top">
          <span class="label tip">属性造伤:</span>
          </Tooltip>
          <InputNumber :min="0" v-model="elementAdd" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
      </div>
      <div class="item-container">
           <Tooltip content="主武器伤害增加，来源：冒险之路、金武等" placement="top">
          <span class="label tip">武器增伤:</span>
           </Tooltip>
          <InputNumber :min="0" v-model="armorAdd" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
      </div>
      <div class="item-container">
            <Tooltip content="与怪物或者玩家的等级差" placement="top">
          <span class="label tip">等级差:</span>
             </Tooltip>
          <InputNumber v-model="levelDiff"/>
      </div>
      <div class="item-container">
          <Tooltip placement="top">
          <span class="label tip">副本特减:</span>
               <div slot="content">
            <p>副本特殊减伤</p>
        </div>
            </Tooltip>
          <InputNumber :min="0" v-model="extraReduction" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
      </div>
      <div class="item-container">
          <Poptip placement="top-end">
          <span class="label second" style="cursor: pointer">怪物防御:</span>
           <div slot="content">
               <p>计算公式： 防御值*(1-百分比破防)-定值破防)/系数</p>
               <p>怪物防御到数据库查，系数一般取28000</p>
                   <div class="item-container">
                  <span class="label">防御值:</span>
               <InputNumber v-model="def" :step="1000" :min="0"/>
               </div>
                   <div class="item-container"> 
                  <span class="label">系数:</span>
               <InputNumber v-model="defNumber"/>
               </div>
               <div class="item-container">
                  <span class="label">百分比破防:</span>
               <InputNumber :step="5" :min="0" :max="50" v-model="defBrokenPer" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
               </div>
                 <div class="item-container">
                  <span class="label">定值破防:</span>
               <InputNumber v-model="defBroken" :step="100"/>
               </div>
            </div>
          </Poptip>
          <InputNumber v-model="monsterDef" @change="defChange" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
      </div>
      <div class="item-container">
           <Tooltip content="XX属性的伤害提高" placement="top">
          <span class="label tip">属性增伤:</span>
           </Tooltip>
          <InputNumber v-model="elementPlus" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
      </div>
      <div class="item-container">
              <Tooltip content="特定技能的伤害提高" placement="top">
          <span class="label tip">技能增伤:</span>
              </Tooltip>
          <InputNumber v-model="skillPlus" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
      </div>
      <div class="item-container">
          <span class="label">韧性:</span>
          <InputNumber v-model="tenacity" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
           <Tooltip content="如果没有韧性，穿透不生效" placement="top">
          <span class="label margin-left tip">穿透:</span>
           </Tooltip>
          <InputNumber v-model="penetration" :formatter="value => `${value}%`" :parser="value => value.replace('%', '')"/>
      </div>
      <div class="item-container">
            <Tooltip content="武器属性增伤20%" placement="top">
          <Checkbox v-model="armorAffect" class="tip">武器属性对应</Checkbox>
            </Tooltip>
      </div>
       <div class="item-container">
           <Tooltip content="怪物属性减伤25%" placement="top">
          <Checkbox v-model="monsterAffect" class="tip">怪物属性对应</Checkbox>
            </Tooltip>
      </div>
    </div>
    <div class="container">
        <div class="item-container">基础值：{{baseDamage}}</div>
    <Table :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: "calculator",
  created() {},
  data() {
    return {
      skillDamage: 100000,
      normalReduction: 60,
      normalAdd: 60,
      criticalDamage: 300,
      elementAdd: 0,
      armorAdd: 0,
      levelDiff: 0,
      extraReduction: 84,
      elementPlus: 0,
      skillPlus: 0,
      tenacity: 0,
      penetration: 0,
      armorAffect: true,
      monsterAffect: false,
      def: 0,
      defNumber: 28000,
      defBrokenPer: 0,
      defBroken: 0,

      baseDamage: null,
      columns1: [
        {
          title: "伤害值",
          key: "damage"
        },
        {
          title: "收益率",
          key: "rate"
        },
        {
          title: " ",
          key: "action",
          render: (h, params) => {
            return h(
              "Icon",
              {
                props: {
                  type: "trash-b",
                  size: "18",
                  color: "gray"
                },
                on: {
                  click: () => {
                    this.remove(params.index);
                  }
                }
              },
              "remove"
            );
          }
        }
      ],
      data1: [],
      defTemp: 75
    };
  },
  methods: {
    setBaseDamage() {
      this.baseDamage = this.damage;
      this.data1.forEach(item => {
        item.rate = ((item.damage / this.baseDamage - 1) * 100).toFixed(2);
      });
    },
    setTableData() {
      let data = {
        damage: this.damage,
        rate: this.curRate
      };
      this.data1.push(data);
    },
    remove(index) {
      this.data1.splice(index, 1);
    },
    defChange(param) {
      console.log(param);
    }
  },
  computed: {
    damage() {
      console.log(this.monsterDef);
      return (
        Number(this.skillDamage) *
        (1 - (Number(this.normalReduction) - Number(this.normalAdd)) / 100) *
        (Number(this.criticalDamage) / 100) *
        (1 + Number(this.elementAdd) / 100) *
        (1 + Number(this.armorAdd) / 100) *
        (1 + 0.02 * Number(this.levelDiff)) *
        (1 - Number(this.extraReduction) / 100) *
        (1 - Number(this.monsterDef) / 100) *
        (1 + Number(this.elementPlus) / 100) *
        (1 + Number(this.skillPlus) / 100) *
        (this.tenacity
          ? 1 - (Number(this.tenacity) - Number(this.penetration)) / 100
          : 1) *
        (this.armorAffect ? 1.2 : 1) *
        (this.monsterAffect ? 0.75 : 1)
      ).toFixed(2);
    },
    monsterDef: {
      get() {
        let finalDef = this.defTemp;
        if (this.def) {
          let calDef =
            (this.def * (1 - this.defBrokenPer / 100) - this.defBroken) /
            this.defNumber *
            100;
          if (calDef < 75) {
            finalDef = calDef.toFixed(2);
          } else {
            this.defTemp = 75;
            finalDef = 75;
          }
        }
        return Number(finalDef);
      },
      set(newValue) {
        this.def = 0;
        this.defTemp = newValue;
      }
    },
    curRate() {
      return this.baseDamage && this.damage
        ? ((this.damage / this.baseDamage - 1) * 100).toFixed(2)
        : 0;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "../style/common/variables";
.tip {
  font-size: 14px;
  color: blue;
}
.label {
  display: inline-block;
  width: 70px;
}
.margin-left {
  margin-left: 10px;
}
.item-container {
  margin: 5px;
}
.container {
  margin-left: 50px;
  display: inline-block;
  width: 40%;
  vertical-align: top;
}
.header {
  margin: 25px 0 25px 55px;
}
.second {
  color: green;
}
.up {
  color: red;
}
.down {
  color: blue;
}
.trash {
  font-size: 16px;
}
</style>
