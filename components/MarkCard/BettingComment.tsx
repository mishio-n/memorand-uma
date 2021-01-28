import { Textarea } from '@chakra-ui/react'
import { ChangeEvent, SetStateAction } from 'react'

type BettingCommentProps = {
  setComment: (value: SetStateAction<string>) => void
}

const BettingComment: React.FC<BettingCommentProps> = ({ setComment }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // 変更時に親コンポーネントのStateを更新する
    setComment(e.target.value)
  }

  return (
    <Textarea
      placeholder="買い目や予想コメント（任意）"
      borderColor="markCard.containerBorder"
      bg="markCard.containerBg"
      borderWidth="2px"
      focusBorderColor="rgba(150,200,50,1.0)"
      resize="none"
      _hover={{
        borderColor: 'markCard.containerBorder'
      }}
      onChange={handleChange}
    />
  )
}

export default BettingComment
