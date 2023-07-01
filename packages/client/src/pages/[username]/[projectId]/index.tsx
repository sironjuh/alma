'use client';

import { FullscreenOutlined, MemoryOutlined, StreamOutlined } from '@mui/icons-material';
import { Session } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Avatar } from '~/components/Avatar/Avatar';
import { Banner } from '~/components/Banner/Banner';
import { FloatingTabBar } from '~/components/FloatingTabBar/FloatingTabBar';
import { PropertyPanel } from '~/components/PropertyPanel/PropertyPanel';
import { FragmentEditor } from '~/containers/FragmentEditor/FragmentEditor';
import { Project } from '~/models/Project/Project.types';
import { ProjectProvider, useProjectContext } from '~/providers/ProjectProvider/ProjectProvider';
import { Size } from '~/types';

export type EditorProps = { initialSession: Session; project: Project };

function EditorHeader() {
    const session = useSession();
    const { project } = useProjectContext();

    return (
        <header className="relative flex flex-row items-center justify-between p-12 pb-0">
            <Link className="z-10" href="/">
                <Image src="/alma_outline.png" alt="logo" width={40} height={40} quality={100} />
            </Link>
            {project && (
                <div className="absolute w-full flex flex-col items-center mx-auto">
                    <h2 className="text-lg font-medium">{project.name}</h2>
                    <span className="text-sm mt-1 opacity-50">{project.private ? 'Private' : 'Public'}</span>
                </div>
            )}
            {session && (
                <div className="z-10">
                    <Link href="/profile">
                        <Avatar size={Size.SM} source={session.user.user_metadata.picture} />
                    </Link>
                </div>
            )}
        </header>
    );
}

export default function Editor() {
    const [compilationError, setCompilationError] = useState<string>();

    const {
        query: { projectId }
    } = useRouter();

    const mainContainerClassNames = clsx(
        'absolute top-32 right-32 bottom-32 left-32 rounded-3xl bg-neutral-100 drop-shadow-2xl overflow-hidden border-2',
        {
            'border-red-400': !!compilationError
        }
    );

    return (
        <ProjectProvider projectId={projectId as string}>
            <main className="flex flex-row h-screen">
                <div className="flex flex-col flex-grow">
                    <EditorHeader />
                    <div className="flex flex-row flex-grow items-center">
                        <aside className="flex flex-col h-full items-center justify-start pl-12">
                            <div className="my-auto">
                                <FloatingTabBar
                                    items={[
                                        { name: 'Edit', path: '/', icon: <MemoryOutlined /> },
                                        { name: 'Preview', path: '/preview', icon: <StreamOutlined /> },
                                        { name: 'Settings', path: '/settings', icon: <FullscreenOutlined /> }
                                    ]}
                                />
                            </div>
                        </aside>
                        <main className="relative flex flex-col items-center justify-center grow w-full h-full">
                            <div className={mainContainerClassNames}>
                                <FragmentEditor />
                            </div>
                            {compilationError && (
                                <div className="fixed bottom-8 mx-auto">
                                    <Banner text={compilationError} />
                                </div>
                            )}
                        </main>
                    </div>
                </div>
                <PropertyPanel
                    onFragmentCompilationError={() => {
                        setCompilationError('Fragment compilation failed.');
                    }}
                />
            </main>
        </ProjectProvider>
    );
}
