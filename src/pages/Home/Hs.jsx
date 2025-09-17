import Sidebar from '../../components/Sidebar/Sidebar'
import { Flex, Text, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

export default function Home() {
  return (
    <Flex w="100%">
      <Sidebar />
    </Flex>
  )
}