import { Textarea } from '@chakra-ui/react'
import { ChangeEvent, SetStateAction } from 'react'

type BettingCommentProps = {
  border: string
  bg: string
  setComment: (value: SetStateAction<string>) => void
}

export const BettingComment: React.FC<BettingCommentProps> = ({
  bg,
  border,
  setComment
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // 変更時に親コンポーネントのStateを更新する
    setComment(e.target.value)
  }

  return (
    <Textarea
      placeholder="買い目や予想コメント（任意）"
      borderColor={border}
      bg={bg}
      borderWidth="2px"
      focusBorderColor="rgba(150,200,50,1.0)"
      resize="none"
      _hover={{
        borderColor: 'markCard.green.container.border'
      }}
      onChange={handleChange}
    />
  )
}
