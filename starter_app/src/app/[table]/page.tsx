'use client'
import React, { useState, useMemo } from 'react';
import {TableContainer, Table, TableHeader, TableRow, TableBody, TableHead, TableCell} from '../components/Table';
import Dropdown from '../components/DropdownMenu';
import Menu from '../components/Menu';
import Checkbox from '../components/Checkbox';
import RadioGroup from '../components/RadioGroup';
import Button from '../components/Button';
import { FunnelIcon as Filter } from '@heroicons/react/24/solid';
import { ArrowsUpDownIcon as Sort } from '@heroicons/react/24/solid';
import SearchBar from '../components/SearchBox';

const filterOptions = ['Non-Discarded Variables', 'Discarded Variables']

const sortOptions = ['Name A-Z', 'Name Z-A', 'Non-Discarded Variables', 'Discarded Variables']

interface RowData {
    name: string;
    steps: (string | null)[];
}

const initialData: RowData[] = [
    { name: 'tx', 
        steps: ['123', '456', '789', '101', '112', '131', '415', '161', '718', '192'] },
    { name: 'datum', 
        steps: ['datum1', 'datum2', 'datum3', 'datum4', 'datum5', 'datum6', 'datum7', 'datum8', 'datum9', 'datum10'] },
    { name: 'redeemer', 
        steps: ['redeemer1', 'redeemer2', 'redeemer3', 'redeemer4', 'redeemer5', 'redeemer6', 'redeemer7', 'redeemer8', 'redeemer9', 'redeemer10'] },
    { name: 'discarded1', 
        steps: [ null , null, null, null, null, null, null, null, null, null] },
    { name: 'value', 
        steps: ['1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000', '10000'] },
    { name: 'script', 
        steps: ['script1', 'script2', 'script3', 'script4', 'script5', 'script6', 'script7', 'script8', 'script9', 'script10'] },
    { name: 'dataHash', 
        steps: ['hash1', 'hash2', 'hash3', 'hash4', 'hash5', 'hash6', 'hash7', 'hash8', 'hash9', 'hash10'] },
    { name: 'inlineDatum', 
        steps: ['inlineDatum1', 'inlineDatum2', 'inlineDatum3', 'inlineDatum4', 'inlineDatum5', 'inlineDatum6', 'inlineDatum7', 'inlineDatum8', 'inlineDatum9', 'inlineDatum10'] },
    { name: 'inlineScript', 
        steps: ['inlineScript1', 'inlineScript2', 'inlineScript3', 'inlineScript4', 'inlineScript5', 'inlineScript6', 'inlineScript7', 'inlineScript8', 'inlineScript9', 'inlineScript10'] },
    { name: 'discarded2', 
        steps: [ null , null, null, null, null, null, null, null, null, null] },
    { name: 'referenceScript', 
        steps: ['referenceScript1', 'referenceScript2', 'referenceScript3', 'referenceScript4', 'referenceScript5', 'referenceScript6', 'referenceScript7', 'referenceScript8', 'referenceScript9', 'referenceScript10'] },
    { name: 'address', 
        steps: ['address1', 'address2', 'address3', 'address4', 'address5', 'address6', 'address7', 'address8', 'address9', 'address10'] },
    { name: 'cert', 
        steps: ['cert1', 'cert2', 'cert3', 'cert4', 'cert5', 'cert6', 'cert7', 'cert8', 'cert9', 'cert10'] },
    { name: 'discarded3', 
        steps: [ null , null, null, null, null, null, null, null, null, null] },
    { name: 'discarded4', 
        steps: [ null , null, null, null, null, null, null, null, null, null] },
    { name: 'discarded5', 
        steps: [ null , null, null, null, null, null, null, null, null, null] },
]

export default function TablePage(){  
    const [searchTerm, setSearchTerm] = useState('');
    const [sortValue, setSortValue] = useState(sortOptions[2]);
    const [filterValues, setFilterValues] = useState<string[]>([filterOptions[1]]);

    const displayData = useMemo(() => {
        let data = initialData;

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            data = data.filter(row => row.name.toLowerCase().includes(lowerTerm));
        }

        if (filterValues.includes(filterOptions[0]) && !filterValues.includes(filterOptions[1])) {
            data = data.filter(row => row.steps.some(step => step === null));
        } else if (filterValues.includes(filterOptions[1]) && !filterValues.includes(filterOptions[0])) {
            data = data.filter(row => row.steps.every(step => step !== null));
        } else if (filterValues.length === 2) {
            data = []; 
        }

        if (sortValue === sortOptions[0]) {
            data = [...data].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === sortOptions[1]) {
            data = [...data].sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortValue === sortOptions[2]) {
            data = [...data].sort((a, b) => {
                const aDiscarded = a.steps.every(step => step === null) ? 1 : 0;
                const bDiscarded = b.steps.every(step => step === null) ? 1 : 0;
                return aDiscarded - bDiscarded;
            });
        } else if (sortValue === sortOptions[3]) {
            data = [...data].sort((a, b) => {
                const aDiscarded = a.steps.every(step => step !== null) ? 1 : 0;
                const bDiscarded = b.steps.every(step => step !== null) ? 1 : 0;
                return aDiscarded - bDiscarded;
            });
        }

        return data;
    }, [searchTerm, filterValues, sortValue]);

    const handleFilterSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        if (filterValues.includes(val)) {
            setFilterValues(filterValues.filter((v) => v !== val))
        } else {
            setFilterValues([...filterValues, val])
        }
    }

    return (
        <div className="font-[family-name:var(--font-geist-sans)] bg-surface flex h-dvh p-8">
            <TableContainer>
                <div className='flex justify-between items-center p-2 bg-containerLow'>
                    <SearchBar 
                        placeholder="Search variables..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        handleClear={() => setSearchTerm('')}
                    />
                    <div className="flex gap-2">
                        <Dropdown 
                            btnLabel={filterValues.length === 0 ? "Filter" :  filterValues.length === 1 ? "Filter: " + filterValues[0] : "Filter: " + filterValues.length } 
                            btnIcon={{ svg: <Filter /> }}  
                            position='right'
                        >
                            <>
                                {filterOptions.map((i) => 
                                    <Menu.Item 
                                        key={i}
                                        className='flex justify-between'>
                                        <Checkbox 
                                            label={i}
                                            value={i}
                                            checked={filterValues.includes(i)}
                                            onChange={handleFilterSelect}  
                                        />
                                    </Menu.Item>
                                )}
                                <Menu.Divider />
                                <Button variant="inherit" content="Clear All" onClick={() => setFilterValues([])} fullWidth className='mb-[8px]'/>
                            </>
                        </Dropdown>
                        <Dropdown 
                            btnLabel={"Sort: " + sortValue}  
                            btnIcon={{ svg: <Sort /> }} 
                            position='right'
                        >
                            {sortOptions.map((i) => 
                                <Menu.Item key={i} className='flex justify-between'>
                                    <RadioGroup.Button
                                        label={i}
                                        value={i}
                                        checked={i === sortValue}
                                        onChange={() => setSortValue(i)}
                                        />
                                </Menu.Item>
                            )}
                        </Dropdown>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableHead>Variable Name</TableHead>
                        {Array.from({ length: initialData[0]?.steps.length || 0 }).map((_, index) => (
                        <TableHead key={index}>Step {index + 1}</TableHead> ))}
                    </TableHeader>
                    <TableBody>
                        {displayData.map((variable) => (
                            <TableRow key={variable.name}>
                                <TableCell>{variable.name}</TableCell>
                                {variable.steps.map((step, stepIndex) => (
                                    <TableCell key={stepIndex}>{step !== null ? step : '-'}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}