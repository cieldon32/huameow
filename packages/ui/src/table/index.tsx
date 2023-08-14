import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Grid } from '@/grid';
import {SortButton} from '@/button/sort';
import {withTd} from './withTd';
import {Pagination} from './Pagination';
import './style/index.scss';

export const Table = ({ className, children, dataSource, primary, onSort, onPage, pageSize }: any) => {
  const classNames = classnames('mdc-table', className);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const ths: any[] = [];
    React.Children.map(children, (child) => {
      ths.push({
        title: child.props.title,
        render: (item: any) => withTd(child.props.children, item),
        name: child.props.name || child.props.children,
        sort: child.props.sort,
      });
    });
    setColumns(ths);
  }, []);
  return (
    <div className={classNames}>
      <Grid variant="table">
        <Grid.Row className="tr">
          {columns.map(({ title, name, sort }: any) => (
            <Grid.Cell key={name} className='th'>
              {title}
              {
                sort ? <SortButton name={sort} onChange={onSort} /> : null
              }
            </Grid.Cell>
          ))}
        </Grid.Row>

        {dataSource.map((data: any) => {
          return (
            <Grid.Row className="tr" key={data[primary]}>
              {columns.map(({ render, name }: any) => (
                <Grid.Cell key={name} className='td'>{render(data)}</Grid.Cell>
              ))}
            </Grid.Row>
          );
        })}
      </Grid>
      {
        pageSize ? <Pagination total={10} onChange={onPage} /> : null
      }

    </div>
  );
};

Table.Cell = function ({children, title, key}: any) {
  return {
    title,
    render: (item: any) => item[children],
    key: key || children
  }
}
