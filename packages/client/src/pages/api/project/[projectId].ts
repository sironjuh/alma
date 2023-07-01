import { LayerSchema } from '@/../types/build';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '~/db';
import { OwnerSchema } from '~/models/Profile/Profile';
import { ProjectSchema } from '~/models/Project/Project';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const supabaseServerClient = createPagesServerClient({ req, res });
    const {
        data: { user }
    } = await supabaseServerClient.auth.getUser();
    const { projectId } = req.query;

    if (typeof projectId !== 'string') {
        res.status(400).send({});
        return;
    }

    const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { owner: true, layers: true }
    });

    if (!project) {
        res.status(404).send({});
        return;
    }

    if (project.owner.userId !== user?.id && project.private) {
        res.status(404).send({});
        return;
    }

    res.status(200).send(
        ProjectSchema.parse({
            id: project.id,
            private: project.private,
            name: project.name,
            image: project.image,
            owner: OwnerSchema.parse({
                ...project.owner,
                createdAt: project.owner.createdAt.toJSON(),
                updatedAt: project.owner.updatedAt.toJSON()
            }),
            layers: project.layers.map(layer =>
                LayerSchema.parse({
                    id: layer.id,
                    name: layer.name,
                    type: layer.type,
                    context: layer.type === 'CIRCUIT' ? JSON.stringify(layer.circuit) : layer.fragment,
                    enabled: layer.enabled,
                    blendingMode: layer.blendingMode
                })
            ),
            createdAt: project.createdAt.toJSON(),
            updatedAt: project.updatedAt.toJSON()
        })
    );
}
