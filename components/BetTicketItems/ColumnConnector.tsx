import { BetType } from '~/server/node_modules/@prisma/client'

type ColumnConnectorProps = {
  betType: BetType
}

export const ColumnConnector: React.FC<ColumnConnectorProps> = ({
  betType
}) => {
  const isCombination =
    betType === 'QUINELLA' ||
    betType === 'QUINELLA_PLACE' ||
    betType === 'BRACKET_QUINELLA' ||
    betType === 'TRIO'

  return isCombination ? (
    <svg width="20" height="20" viewBox="0 0 50 100">
      <polygon points="0,45 0,55 100,55 100,45" fill="#000" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 50 100">
      <polygon points="0,0 0,100 50,50" fill="#000" />
    </svg>
  )
}
