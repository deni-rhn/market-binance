import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Flex,
  HStack,
  Badge,
} from '@chakra-ui/react';
import FormField from '@components/Universal/FormField';
import { SearchIcon } from '@chakra-ui/icons';
import { TagList } from '../Helpers/Model';
import { useState } from 'react';
import { IMarketFilterProps } from '../Types/Props';

const HomePageFilter: React.FC<IMarketFilterProps> = ({
  onFilterTags,
  onSearch,
}) => {
  const [tagActive, setTagActive] = useState<string>('all');

  const onSetTag = (tag: string) => setTagActive(tag);

  return (
    <Stack mb={5} direction={{ base: 'column', md: 'row', sm: 'column' }}>
      <Flex
        flex={3}
        whiteSpace={'nowrap'}
        overflowX={'scroll'}
        css={{
          '&::-webkit-scrollbar': {
            width: '0px !important',
            height: 0,
          },
          overflow: '-moz-scrollbars-none',
          '-ms-overflow-style': 'none',
        }}
      >
        <HStack>
          {TagList.map((item: any, idx: number) => (
            <Badge
              cursor={'pointer'}
              key={idx}
              variant={item.code === tagActive ? 'solid' : 'outline'}
              padding={'5px 10px'}
              onClick={() => {
                onSetTag(item.code);
                onFilterTags(item.code);
              }}
              colorScheme={item.code === tagActive ? 'cyan' : ''}
              border={'1px solid #EDF2F7'}
            >
              {item.name}
            </Badge>
          ))}
        </HStack>
      </Flex>
      <Flex flex={1} align={'end'} justify={'end'}>
        <FormField
          field={
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input onChange={onSearch} placeholder="Search something..." />
            </InputGroup>
          }
        />
      </Flex>
    </Stack>
  );
};

export default HomePageFilter;
