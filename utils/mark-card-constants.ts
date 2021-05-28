import { BetType, MarkCardType } from '.prisma/client'

export const getSerialFromOne = (end: number) =>
  [...Array(end)].map((_, i) => 1 + i)

export const MARK_CARD_TYPE_TABLE: Record<MarkCardType, string> = {
  NORMAL: '',
  WHEEL: '流し',
  BOX: 'ボックス',
  FORMATION: 'フォーメーション'
}

export const BET_TYPES = [
  {
    name: '単勝',
    type: 'WIN'
  },
  {
    name: '複勝',
    type: 'PLACE'
  },
  {
    name: 'ワイド',
    type: 'QUINELLA_PLACE'
  },
  {
    name: '枠連',
    type: 'BRACKET_QUINELLA'
  },
  {
    name: '馬連',
    type: 'QUINELLA'
  },
  {
    name: '馬単',
    type: 'EXACTA'
  },
  {
    name: '3連複',
    type: 'TRIO'
  },
  {
    name: '3連単',
    type: 'TRIFECTA'
  }
] as const

export const COMBINATION_BET_TYPES = [
  {
    name: 'ワイド',
    type: 'QUINELLA_PLACE'
  },
  {
    name: '枠連',
    type: 'BRACKET_QUINELLA'
  },
  {
    name: '馬連',
    type: 'QUINELLA'
  },
  {
    name: '馬単',
    type: 'EXACTA'
  },
  {
    name: '3連複',
    type: 'TRIO'
  },
  {
    name: '3連単',
    type: 'TRIFECTA'
  }
] as const

export const HORSE_NUM = getSerialFromOne(18)

export const RACE_NUM = getSerialFromOne(12)

export const CONFIDENCE_NUM = [30, 20, 10, 5, 4, 3, 2, 1]
