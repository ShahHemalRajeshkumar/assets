import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, { useState } from 'react';
import { storyblokEditable } from '@storyblok/react';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('./DynamicComponent'));
import Styles from '../styles/tabs.module.scss';

const TabComponent = ({ blok }) => {
  const [contentIndex, setContentIndex] = useState(0);

  const onDrop = (value) => {
    setContentIndex(value);
  };
  const [selected, setSelected] = useState(blok.tabs[0]._uid);

  return (
    <div {...storyblokEditable(blok)} >
      <Tabs className='hidden md:block'>
        <TabList className={`${Styles['react-tabs__tab-list']}`}>
          {blok.tabs.map((tab) => (
            <Tab
              onClick={() => setSelected(tab._uid)}
              key={tab._uid}
              className={`${Styles['react-tabs__tab']} ${
                selected === tab._uid && Styles['react-tabs__tab--selected']
              }`}>
              {tab.tab}
            </Tab>
          ))}
        </TabList>
        {blok.content.map((content) =>
          content.components.map((component) => (
            <TabPanel key={component._uid}>
              <DynamicComponent blok={component} key={component._uid} />
            </TabPanel>
          ))
        )}
      </Tabs>
      <div className='md:hidden'>
        <select className='bg-white py-2 border-b-2 my-2' onChange={(e) => onDrop(e.target.value)}>
          {blok.tabs.map((tab, index) => (
            <option key={tab._uid} value={index}>
              {tab.tab}
            </option>
          ))}
        </select>
        <div>
          {blok.content[contentIndex]?.components[0].components?.map((component) => {
            return <DynamicComponent blok={component} key={component._uid} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
