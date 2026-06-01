import { type Component, For, createMemo, createSignal } from 'solid-js'
import readme from '../../DevStudio/README.md?raw'
import projectBrief from '../../DevStudio/00_Project_Brief.md?raw'
import architectureNotes from '../../DevStudio/01_Architecture_Notes.md?raw'
import developmentPlan from '../../DevStudio/02_Development_Plan.md?raw'
import kanban from '../../DevStudio/03_Kanban.md?raw'
import referenceIndex from '../../DevStudio/04_Reference_Index.md?raw'
import doneDefinition from '../../DevStudio/05_Done_Definition.md?raw'
import questions from '../../DevStudio/06_Questions.md?raw'

type DevStudioDoc = {
  id: string
  title: string
  filename: string
  content: string
}

const DOCS: DevStudioDoc[] = [
  { id: 'readme', title: 'Overview', filename: 'README.md', content: readme },
  { id: 'brief', title: 'Project Brief', filename: '00_Project_Brief.md', content: projectBrief },
  { id: 'architecture', title: 'Architecture', filename: '01_Architecture_Notes.md', content: architectureNotes },
  { id: 'plan', title: 'Development Plan', filename: '02_Development_Plan.md', content: developmentPlan },
  { id: 'kanban', title: 'Kanban', filename: '03_Kanban.md', content: kanban },
  { id: 'references', title: 'References', filename: '04_Reference_Index.md', content: referenceIndex },
  { id: 'done', title: 'DONE Definition', filename: '05_Done_Definition.md', content: doneDefinition },
  { id: 'questions', title: 'Questions', filename: '06_Questions.md', content: questions },
]

const PageDevStudio: Component = () => {
  const [activeDocId, setActiveDocId] = createSignal('plan')
  const activeDoc = createMemo(() => DOCS.find((doc) => doc.id === activeDocId()) ?? DOCS[0])

  return (
    <div class="h-full bg-nacc-light overflow-hidden flex flex-col">
      <div class="px-6 pt-4 pb-3 bg-white border-b border-nacc-border shrink-0">
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <h1 class="text-xl font-bold text-nacc-dark leading-tight">DevStudio</h1>
            <p class="text-xs text-gray-500 mt-1">
              note00-gallerynotedb_vol1.1 の実装計画、Kanban、DONE定義をローカルサーバー内で確認する。
            </p>
          </div>
          <div class="text-xs text-gray-400 shrink-0 text-right">
            <div>Source</div>
            <div class="font-semibold text-nacc-dark">/DevStudio</div>
          </div>
        </div>
      </div>

      <div class="flex flex-1 min-h-0 overflow-hidden">
        <aside class="w-64 shrink-0 bg-white border-r border-nacc-border overflow-y-auto p-3">
          <div class="text-xs font-semibold text-gray-400 px-2 pb-2">Documents</div>
          <For each={DOCS}>
            {(doc) => (
              <button
                class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-1"
                classList={{
                  'bg-nacc-light text-nacc-dark font-semibold': activeDocId() === doc.id,
                  'text-gray-500 hover:bg-gray-50': activeDocId() !== doc.id,
                }}
                onClick={() => setActiveDocId(doc.id)}
              >
                <span class="block truncate">{doc.title}</span>
                <span class="block text-[11px] text-gray-400 truncate mt-0.5">{doc.filename}</span>
              </button>
            )}
          </For>
        </aside>

        <main class="flex-1 min-w-0 overflow-y-auto p-6">
          <article class="bg-white border border-nacc-border rounded-xl shadow-sm max-w-5xl">
            <div class="px-5 py-4 border-b border-nacc-border">
              <div class="text-xs text-gray-400">{activeDoc().filename}</div>
              <h2 class="text-lg font-bold text-nacc-dark mt-1">{activeDoc().title}</h2>
            </div>
            <pre class="whitespace-pre-wrap break-words text-sm leading-7 text-nacc-dark p-5 font-mono">
              {activeDoc().content}
            </pre>
          </article>
        </main>
      </div>
    </div>
  )
}

export default PageDevStudio
