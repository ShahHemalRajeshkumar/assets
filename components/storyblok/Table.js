import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { white } from 'config/colors';
import DynamicComponent from '../DynamicComponent';
import { useMediaQuery } from 'react-responsive';
import SbEditable from 'storyblok-react';

const Table = ({ blok }) => {
  const DesktopSize = useMediaQuery({ minWidth: 1030 });
  const TabletSize = useMediaQuery({ minWidth: 600, maxWidth: 1029 });
  const MobileSize = useMediaQuery({ maxWidth: 599 });

  return (
    <>
      {DesktopSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div>
            <table
              className=''
              style={{
                background: blok.bg_color ? blok.bg_color?.color : 'transparent',
                borderCollapse: 'collapse',
              }}>
              <thead className='border-4 border-white p-20'>
                <tr>
                  {blok.thead?.map((nestedBlok, index) => (
                    <th
                      key={index}
                      style={{
                        width: `${blok.thead_width_desktop}px`,
                        height: `${blok.thead_height_desktop}px`,
                      }}
                      rowSpan={blok.row_span}
                      colSpan={blok.col_span}
                      className='border-4 border-white'>
                      <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {blok.tbody?.map((row, index) => (
                  <tr key={index}>
                    {row.table_body_tr?.map((nestedBlok) => (
                      <>
                        <td
                          rowSpan={nestedBlok.td_row_span}
                          colSpan={nestedBlok.td_col_span}
                          className='border-4 border-white'
                          style={{
                            width: `${nestedBlok.tbody_width_desktop}px`,
                            height: `${nestedBlok.tbody_height_desktop}px`,
                          }}>
                          <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
                        </td>
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SbEditable>
      )}

      {TabletSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div>
            <table
              className=''
              style={{
                background: blok.bg_color ? blok.bg_color?.color : 'transparent',
                borderCollapse: 'collapse',
              }}>
              <thead className='border-4 border-white p-20'>
                <tr>
                  {blok.thead?.map((nestedBlok, index) => (
                    <th
                      key={index}
                      style={{
                        width: `${blok.thead_width_tablet}px`,
                        height: `${blok.thead_height_tablet}px`,
                      }}
                      rowSpan={blok.row_span}
                      className='border-4 border-white'>
                      <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {blok.tbody?.map((row, index) => (
                  <tr key={index}>
                    {row.table_body_tr?.map((nestedBlok) => (
                      <>
                        <td
                          rowSpan={nestedBlok.td_row_span}
                          colSpan={nestedBlok.td_col_span}
                          className='border-4 border-white'
                          style={{
                            width: `${nestedBlok.tbody_width_tablet}px`,
                            height: `${nestedBlok.tbody_height_tablet}px`,
                          }}>
                          <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
                        </td>
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SbEditable>
      )}

      {MobileSize && (
        <SbEditable content={blok} key={blok._uid}>
          <div>
            <table
              className=''
              style={{
                background: blok.bg_color ? blok.bg_color?.color : 'transparent',
                borderCollapse: 'collapse',
              }}>
              <thead className='border-4 border-white p-20'>
                <tr>
                  {blok.thead?.map((nestedBlok, index) => (
                    <th
                      key={index}
                      style={{
                        width: `${blok.thead_width_mobile}px`,
                        height: `${blok.thead_height_mobile}px`,
                      }}
                      rowSpan={blok.row_span}
                      className='border-4 border-white'>
                      <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {blok.tbody?.map((row,index) => (
                  <tr key={index}>
                    {row.table_body_tr?.map((nestedBlok, index) => (
                      <td
                        key={index}
                        rowSpan={nestedBlok.td_row_span}
                        colSpan={nestedBlok.td_col_span}
                        className='border-4 border-white'
                        style={{
                          width: `${nestedBlok.tbody_width_mobile}px`,
                          height: `${nestedBlok.tbody_height_mobile}px`,
                        }}>
                        <DynamicComponent blok={nestedBlok} key={nestedBlok._uid} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SbEditable>
      )}
    </>
  );
};

export default Table;
