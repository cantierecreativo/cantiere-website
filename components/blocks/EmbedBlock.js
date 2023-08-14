import React from 'react'
import Frame from 'react-frame-component';

export default function TextBlock({ locale, record }) {
  const { src, embedType } = record;
  let props =  record.properties || {};
  const {title } = props;
  return (
    <div className="container h-[100%]">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-start-2 lg:col-span-10">
            {embedType === "iframe" && (<iframe src={src} className="min-h-[500px] w-full"  title = {title?? ""}   />)}
            {embedType === "script" && ( <Frame
              style={{ width: '100%', height: '100%' }}
              initialContent={`<!DOCTYPE html><html><head></head><body><script src="${src}"></script></body></html>`}
            />)}
        </div>
      </div>
    </div>
  );

}
