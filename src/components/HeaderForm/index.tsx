import { Image, Text } from '@fluentui/react';
import React from 'react';
import { View } from '../../styles';

interface Props{
    src?: string;
    label: string;
    description: string;
}

const HeaderForm: React.FC<Props> = ({ description, src, label }) => (
  <View style={{ marginTop: '1em' }}>
    <View style={{ flexDirection: 'row' }}>
      <Image src={src} width={60} />
      <View style={{ marginLeft: 20 }}>
        <Text variant="xxLarge">{label}</Text>
        <Text>
          {description}
        </Text>
      </View>
    </View>
  </View>
);

export { HeaderForm };
