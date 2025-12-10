import { useMemo } from 'preact/hooks'
import { Footer, GeneratorCard, ToolCard, ToolGroup } from '../components/index.js'
import { useLocale, useTitle } from '../contexts/index.js'
import { Store } from '../Store.js'

const MIN_FAVORITES = 2
const MAX_FAVORITES = 5

interface Props {
	path?: string,
}
export function Home({}: Props) {
	const { locale } = useLocale()
	useTitle(locale('title.home'))

	return <main>
		<div class="legacy-container">
			<div class="card-group">
				<PopularGenerators />
				<FavoriteGenerators />
			</div>
			<Footer />
		</div>
	</main>
}

function PopularGenerators() {
	const { locale } = useLocale()
	return <ToolGroup title={locale('generators.recommended')} link="/generators/">
		<ToolCard title={locale('generator.rewards:calendar')} link="/rewards/calendar" titleIcon="arrow_right" />
	</ToolGroup>
}

function FavoriteGenerators() {
	const { locale } = useLocale()

	const favorites = useMemo(() => {
		const history: string[] = []
		for (const id of Store.getGeneratorHistory().reverse()) {
			if (!history.includes(id)) {
				history.push(id)
			}
		}
		return history.slice(0, MAX_FAVORITES)
	}, [])

	if (favorites.length < MIN_FAVORITES) return <></>

	return <ToolGroup title={locale('generators.recent')}>
		{favorites.map(f => <GeneratorCard minimal id={f} />)}
	</ToolGroup>
}
