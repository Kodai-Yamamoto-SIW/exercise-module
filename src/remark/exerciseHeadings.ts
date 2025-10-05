import type {Plugin} from 'unified';
import {visit} from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
import type {Heading} from 'mdast';

export interface RemarkExerciseHeadingOptions {
  headingLevel?: number;
}

function clampHeadingLevel(level: number): 1 | 2 | 3 | 4 | 5 | 6 {
  const normalized = Math.min(6, Math.max(1, Math.round(level)));
  return normalized as 1 | 2 | 3 | 4 | 5 | 6;
}

const remarkExerciseHeadings: Plugin<[
  RemarkExerciseHeadingOptions?
]> = (rawOptions) => {
  const headingLevel = clampHeadingLevel(rawOptions?.headingLevel ?? 2);
  const slugger = new GithubSlugger();

  return (tree) => {
    slugger.reset();

  visit(tree as any, 'mdxJsxFlowElement', (node: any, index: number | undefined, parent: any) => {
      if (node?.name !== 'Exercise') {
        return;
      }

      node.data = node.data ?? {};
      if (node.data.__exerciseHeadingProcessed) {
        return;
      }

      node.data.__exerciseHeadingProcessed = true;

      const attributes = Array.isArray(node.attributes) ? node.attributes : [];
      const titleAttribute = attributes.find(
        (attribute: any) =>
          attribute?.type === 'mdxJsxAttribute' &&
          attribute.name === 'title' &&
          typeof attribute.value === 'string',
      );

      const title = typeof titleAttribute?.value === 'string'
        ? titleAttribute.value.trim()
        : undefined;

      if (!title) {
        return;
      }

      const slug = slugger.slug(title);
      console.log('[exercise plugin] add heading', title, slug);

      if (typeof index === 'number' && parent && Array.isArray(parent.children)) {
        const anchorHeadingNode: Heading = {
          type: 'heading',
          depth: headingLevel,
          data: {
            hProperties: {
              id: slug,
              className: 'exerciseHeadingAnchor',
            },
          },
          children: [
            {
              type: 'text',
              value: title,
            },
          ],
        };

        parent.children.splice(index, 0, anchorHeadingNode);
      }

      const hasHeadingIdAttribute = attributes.some(
        (attribute: any) =>
          attribute?.type === 'mdxJsxAttribute' && attribute.name === 'headingId',
      );

      if (!hasHeadingIdAttribute) {
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'headingId',
          value: slug,
        });
      }

      const hasHeadingLevelAttribute = attributes.some(
        (attribute: any) =>
          attribute?.type === 'mdxJsxAttribute' && attribute.name === 'headingLevel',
      );

      if (!hasHeadingLevelAttribute) {
        attributes.push({
          type: 'mdxJsxAttribute',
          name: 'headingLevel',
          value: headingLevel,
        });
      }

      node.attributes = attributes;
    });
  };
};

export default remarkExerciseHeadings;
