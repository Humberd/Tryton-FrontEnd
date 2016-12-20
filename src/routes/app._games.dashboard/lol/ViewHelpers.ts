export class ViewHelpers {
	public calculateProgress(obj: any): number {
		let wanted = obj.settings.times.value;
		let made = wanted - obj.progress.remainingCompletions;
		return made / wanted * 100;
	}
}