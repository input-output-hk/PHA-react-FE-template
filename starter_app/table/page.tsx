'use client'
import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client'
import {TableContainer, Table, TableHeader, TableRow, TableBody, TableHead, TableCell} from '../src/components/Table';
import Dropdown from '../src/components/DropdownMenu';
import { FunnelIcon as Filter } from '@heroicons/react/24/solid';
import { ArrowsUpDownIcon as Sort } from '@heroicons/react/24/solid';
import SearchBar from '../src/components/SearchBox';
import '../src/global.css';

const filterOptions = [
        { itemLabel: 'Non-Discarded Variables', value: 'non-discarded', suffixText: '11' },
        { itemLabel: 'Discarded Variables', value: 'discarded', suffixText: '7' },
      ]

    const sortOptions = [
        { itemLabel: 'Name A-Z', value: 'name-asc' },
        { itemLabel: 'Name Z-A', value: 'name-desc' },
        { itemLabel: 'Non-Discarded Variables', value: 'non-discarded', defaultChecked: true },
        { itemLabel: 'Discarded Variables', value: 'discarded' },
      ]

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
    const [sortValue, setSortValue] = useState('non-discarded');
    const [filterValues, setFilterValues] = useState<string[]>(['discarded']);

    const displayData = useMemo(() => {
        let data = initialData;

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            data = data.filter(row => row.name.toLowerCase().includes(lowerTerm));
        }

        if (filterValues.includes("non-discarded") && !filterValues.includes("discarded")) {
            data = data.filter(row => row.steps.some(step => step === null));
        } else if (filterValues.includes("discarded") && !filterValues.includes("non-discarded")) {
            data = data.filter(row => row.steps.every(step => step !== null));
        } else if (filterValues.length === 2) {
            data = []; 
        }

        if (sortValue === "name-asc") {
            data = [...data].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === "name-desc") {
            data = [...data].sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortValue === "non-discarded") {
            data = [...data].sort((a, b) => {
                const aDiscarded = a.steps.every(step => step === null) ? 1 : 0;
                const bDiscarded = b.steps.every(step => step === null) ? 1 : 0;
                return aDiscarded - bDiscarded;
            });
        } else if (sortValue === "discarded") {
            data = [...data].sort((a, b) => {
                const aDiscarded = a.steps.every(step => step !== null) ? 1 : 0;
                const bDiscarded = b.steps.every(step => step !== null) ? 1 : 0;
                return aDiscarded - bDiscarded;
            });
        }

        return data;
    }, [searchTerm, filterValues, sortValue, initialData]);

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
                            btnLabel="Filter" 
                            btnIcon={{ svg: <Filter /> }} 
                            listItems={filterOptions} type='checkbox' 
                            position='right'
                            selected={filterValues}
                            onChange={(val) => setFilterValues(val as string[])} 
                        />
                        <Dropdown 
                            btnLabel="Sort" 
                            btnIcon={{ svg: <Sort /> }} listItems={sortOptions} 
                            type='radio' 
                            position='right'
                            selected={sortValue}
                            onChange={(val) => setSortValue(val as string)}
                        />
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

createRoot(document.getElementById('table')!).render(
  <TablePage />,
)